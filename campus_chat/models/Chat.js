import { Model, DataTypes } from 'sequelize';

export default class Chat extends Model {
  static init(sequelize) {
    return super.init(
      {
        user: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        chat: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: 'Chat',
        modelName: 'chats',
        timestamps: true,
        sequelize,
      },
    );
  }

  static associate(db) {
    db.Chat.belongsTo(db.Room);
  }
}
