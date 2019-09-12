# Bootcamp Rocketseat - Module 03

## Continuing GoBarber API

## 1 Configuring Multer to File Upload

We'll make the file upload apart from the user creation API, so we will only pass the file id for the user avatar at the user register moment. To send files we need to use multipart/form-data, for it we will use multer:

    yarn add multer

## 2 Model relations

We created the File model and migration, to save the file path and name inside our database. Now we created a new migration add-avatar-field-to-users that add a new column at users table which makes a reference to the files table.

```JS
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
```

The `onUpdate` ad `onDelete` are the actions that should be applied when the row referenced row be updated or deleted, in that case at update just update the column too, and for delete just set null as value.

We need to create the association with our models, at user model we create a static method that will be responsible to make the model association.

```JS
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }
```
This will create a association between User and File, creating a avatar_id at users model that references the File.id. For more information see [sequelize associations](https://sequelize.org/master/manual/associations.html).

At last add at `database/index.js` the map for the call of associate of our models:

```JS
.map(model => model.associate && model.associate(this.connection.models));
```
## 3 Creating the Providers route

The providers route will retrieve all the users that it's a provider, and will retrieve the avatar association too with find.All

```JS
 const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });
```

The attributes defines what we want to retrieve. The include inform the relations we want to bring, the `as: 'avatar'` was put at the `static associate` of User model too, to rename the association name.

### 3.1 Creating the files route

The files route will send the specified image, at `src/app.js` we can create a middleware to handle the requests

```JS
    // this creates a route that will respond with the static file specified at the route parameter
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
```

The express.static sends a file from the server.

### 4 creating the appointment migration and controller

Here a important point is that if some Model has two or more relation with the the same Model like,

```JS
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
```

We need do give the relation the `as` nickname, if we don't specify it the sequelize will cannot resolve each one should use.

#### 4.1 passing timezone request json body

We can specify the timezone of our date adding a `T` between the date and hour and at the end specify the hour difference of our timezone, for example `UTC -03` will be:
```JSON
{
	"date": "2019-07-01T18:00:00-03:00"
}
```

The sequelize will handle correctly the date with the Timezone.

#### 4.2 Adding date-fns

We will install `date-fns` to help us to do date validation,

    yarn add date-fns@next

the `@next` give us the most updated version.

#### 4.3 Listing Appointments

For listing appointments we will filter all appoints of the token `userId` and get all not cancelled appointment of that user ordered by date. We will get the information about the provider and his avatar stacking the includes at the findAll like this,

```JS
const appointments = await Appointment.findAll({
      where: {
        user_id: request.userId,
        cancelled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
```

In the attributes of the relations we NEED to pass the ID because the sequelize need it for resolve the dependency, and for avatar we need the path too, because the URL get need it for build the URL.

#### 4.4 Appointments pagination

To handle multiple appointments at the get, we will add pagination as query parameter. We will can specify the `?page=` we want to bring and our controller will handle it. At the `findAll` we will add the properties:
```JS
      limit: 20,
      offset: (page - 1) * 20,
```

The `limit` will specify the maximum number of register the will bring, and the `offset` specifies for which result the find will start to count the limit.

### 5 Creating the Schedule Controller

The Schedule controller will list all the appointment of a given provider at some specified date from query parameter. Here we will user the `startOfDay` and `endOfDay` of `date-fns`, to get the first hour and the last hour of the specified date. The `[Op.between]` is from sequelize Op that give to us several operators to use in our find queries, we need to put it in braces to be our object property.

```JS
    const appointments = await Appointment.findAll({
      where: {
        provider_id: request.userId,
        cancelled_at: null,
        date: { [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)] },
      },
      order: ['date'],
    });
```

### 6 Non Relational database (MongoDB)

We will use a non relational database because we will have data that doesn't have relation and need to be store on a performative way. On this project we will user the `MongoDB` database, to start we will use docker to run the image from MongoDb:

    docker run --name <container_name> -p 27017:27017 -d -t mongo

To start the container just:

    docker start <container_name>

Accessing the `localhost:27017` should return the following message if everything it's ok:

    It looks like you are trying to access MongoDB over HTTP on the native driver port.

#### 6.1 Installing mongoose at our project

As the sequelize is our ORM for relational database we will have the `mongoose` with the same purpose. To add:

    yarn add mongoose

The configuration we will do at `src/database/index.js`, adding the `mongo()` method:
```JS
mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
```

We will create the connection passing the URL where our mongoDB is and some parameters. The `useNewUrlParser` that specify we are using the new url format and the `useFindAndModify` that is a config we will use that how the DB will act when its finding and modifying registers. I got the message:

    (node:20547) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.

So I added the `useUnifiedTopology` too, to avoid the warning.

Do not forget to put the `this.mongo()` at the Database constructor.

#### 6.2 Appointment notifications

We will use the mongoDB to store the appointment notification of the provider, that will be send when a new appointment is schedule. The mongo use schemas that is like our model/table of relational database, however the schema is free, that is each data can be have a different structure from each other in that schema. The schemas can change without the need of a migration like sequelize.

Inside our `app` dir we created the schemas dir to put our mongo schemas, and created the `Notification.js`. We will build the content message at the moment the appointment is created with the user name and the date, in this way we will not need a relation with that user gaining performance using a non-relation database. In a meanwhile, if the user change his name the message will not change, this is a behavior that we are willing to afford when using mongo to gain performance.

#### 6.3 MongoDB compass UI

We will use the mongoDB compass community to see our mongoDB information.

