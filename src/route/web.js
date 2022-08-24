import express from 'express';
import HomeComtroller from '../controller/HomeController'
let router = express.Router();
const initWebRouter = (app) => {

    router.get('/',HomeComtroller.getHomePage)
    router.get('/detail/user/:userId',HomeComtroller.getDetailPage)
    router.post('/create-new-user',HomeComtroller.createNewUser)

    router.get('/about', (req, res) => {
        res.send('Hello World about!')
    })
    return app.use('/',router)
}
// module.exports = initWebRouter;
export default initWebRouter;