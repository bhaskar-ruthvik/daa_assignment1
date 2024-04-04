import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import PathPage from "../screens/PathPage";

export default {
    title: "Pages/Path Page",
    render: ()=> <PathPage />,
    decorators: [withRouter],
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This is page contains the list of algorithms one can choose"
    },
}

export const Path = {
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                state: {fromPage: "/convexdef"}
            },
            routing: {
                path: '/path',
                handle: 'path'
            }
        })
    }
}