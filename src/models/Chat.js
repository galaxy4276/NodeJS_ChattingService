import { Model, DataTypes } from 'sequelize';


export default class Chat extends Model {
  static init(sequelize) {
    return super.init({
      user: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      chat: DataTypes.TEXT,
      gif: DataTypes.TEXT,
    }, {
      modelName: 'Chat',
      tableName: 'chats',
      timestamps: true,
      sequelize,
    }); 
  }

  static associate(db) {
    db.chat.belongsTo(db.room);
  }
}