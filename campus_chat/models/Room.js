import { Model, DataTypes } from 'sequelize';

export default class Room extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 2,
        },
        password: {
          type: DataTypes.STRING(6),
          allowNull: true,
        },
      },
      {
        tableName: 'Room',
        modelName: 'rooms',
        timestamps: true,
        sequelize,
      },
    );
  }

  static associate(db) {
    db.Room.hasMany(db.Chat);
  }
}
