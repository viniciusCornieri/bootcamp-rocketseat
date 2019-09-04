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
