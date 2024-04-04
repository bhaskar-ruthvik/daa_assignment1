import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import Home from "../screens/Home";


export default{
    title: "Pages/Home",
    render: () => <Home />,
    decorators: [withRouter],
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This is the homepage of the website"
    },
}

export const HomePage = {
    parameters: {
        reactRouter: reactRouterParameters({
            routing: {
                path: '/',
                handle: 'home'
            }
        })
    }
}