const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
}, {
    timestamps: true
});

// Hash password antes de guardar
userSchema.pre("save", async function(next) {
    // Solo hashear si la contraseña fue modificada
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// NUNCA devolver la contraseña en un JSON
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

const User = model('User', userSchema);
module.exports = User;
