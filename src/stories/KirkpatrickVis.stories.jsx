import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import Kirkpatrick from "../screens/Kirkpatrick";

export default {
    title: "Pages/Algorithms/Visualisation/Kirkpatrick",
    component: Kirkpatrick,
    decorators: [withRouter],
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This page contains the visualisation of the Kirkpatrick Seidel algorithm"
    },
}

export const KirkpatrickSeidel = {
    render: () => <Kirkpatrick />,
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                pathParams: { stepid: 1 },
                state: {fromPage: "/kirkpatrickvis"}
            },
            routing: {
                path: '/kirkpatrickvisu/:stepid',
                handle: 'kirkpatrickvisu'
            }
        })
    }
}