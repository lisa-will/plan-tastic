module.exports = function(sequelize, DataTypes)
{
    return sequelize.define("calendar", {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      start: {
        type: DataTypes.STRING(48),
        allowNull: false
      },
      end: {
        type: DataTypes.STRING(48),
        allowNull: false
      },
      allDay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      timestamps: false,
      //Even though the plural is the default I wanted to be explicit
      //as well as remember how to do it in the future
      freezeTableName: true,

        // define the table's name
      tableName: 'calendar',
    });

};
