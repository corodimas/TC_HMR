module.exports = (sequelize,DataType) =>{

    const clinics = sequelize.define("clinics",{

        department:{
            type:DataType.STRING,
            allowNull: false,
        },
        address:{
            type:DataType.STRING,
            allowNull: false,
        },
        telephone:{
            type:DataType.INTEGER,
            allowNull: false,
        },
    })
    return clinics
}