## Mongoose and TypeScript Compatiblity

Mongoose and TypeScript do not play well together because mongoose does not have a @types/mongoose npm package. Therefore to make TypeScript work well with mongoose we have to make some interfaces which extend base mongoose classes.

### Interfaces to be made 
1. Attrs - this interface defines the attributes that we want to use for our model
2. Doc - This extends the mongoose.Document class and defines the attributes that will be returned by mongoose.
3. Model - this extends mongoose.Model class and defines the build method which helps us define the parameters that'll be used to create a new entry