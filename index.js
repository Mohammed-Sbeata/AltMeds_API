const app = require('./app')
const  {connectToDb} = require('./configurations');
const port = process.env.PORT
connectToDb()
    .then(() => {
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
