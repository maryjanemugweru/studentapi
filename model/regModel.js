const bcrypt =  require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const Reg = sequelize.define('registration', {
        reg_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        regName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        regEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        regPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
        // Function to hash password before saving
        Reg.beforeCreate( async (reg) => {
            try {
                const salt = await bcrypt.genSalt(12);
                const hashedPwd = await bcrypt.hash(reg.regPassword, salt)
                reg.regPassword = hashedPwd;
            } catch (error) {
                throw new Error("Error encrypting password")
            }
        })
    
        // Function to compare the entered password with the saved hashed password
        Reg.prototype.isValidPassword = async function(password) {
            try {
                return await bcrypt.compare(password, this.regPassword);
            } catch (error) {
                throw error;
            }
        };
    return Reg;

}