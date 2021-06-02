import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// Defines basic attributes for the User Model
interface UserAttrs{
    email:string,
    password: string
}

// Collection kind of a class that adds lint functionality for build 
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
}

// This class helps us extract data out of the model without exposing extra fields
interface UserDoc extends mongoose.Document{
    email: string,
    password: string
}

const UserSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs);
}

UserSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed = bcrypt.hashSync(this.get('password'),10);
        this.set('password',hashed);
    }
    done();
});

const User = mongoose.model<UserDoc,UserModel>('User',UserSchema);

export { User } ;