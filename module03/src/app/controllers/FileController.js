import File from '../models/File';

class FileController {
  async store(request, response) {
    if (!request.file) {
      return response.status(400).json({ error: 'File not found' });
    }
    const { originalname: name, filename: path } = request.file;
    const file = await File.create({ name, path });
    return response.json({ file });
  }
}

export default new FileController();
