import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required'],
    },
    profilePicture: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
        maxlength: [500, 'Bio cannot be more than 500 characters'],
    },
    institution: {
        type: String,
        default: '',
    },
    joinedGroups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudyGroup',
        default: [],
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Prevent passwordHash from being returned in queries by default
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.passwordHash;
        return ret;
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;