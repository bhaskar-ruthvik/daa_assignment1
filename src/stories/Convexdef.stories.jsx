import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import AlgoMain from "../screens/Algomain";

export default {
    title: "Pages/Introduction",
    component: AlgoMain,
    decorators: [withRouter],
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This is page contains the description of a Convex Hull"
    },
}

export const ConvexHull = {
    render: () => <AlgoMain  key={2} id={2} heading="What is a Convex Hull?" />,
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                state: {fromPage: "home"}
            },
            routing: {
                path: '/convexdef',
                handle: 'convexdef'
            }
        })
    }
}