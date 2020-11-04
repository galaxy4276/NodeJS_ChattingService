import { Model, DataTypes } from 'sequelize';


export default class Room extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      max: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        // min 2  
      },
      owner: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
      }
    }, {
      modelName: 'Room',
      tableName: 'rooms',
      timestamps: true,
      sequelize,
    }); 
  }

  static associate(db) {
    db.Room.hasMany(db.Chat);
  }
}