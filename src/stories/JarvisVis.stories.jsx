import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import Jarvis from "../screens/Jarvis";

export default {
    title: "Pages/Algorithms/Visualisation/Jarvis",
    component: Jarvis,
    decorators: [withRouter],
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This page contains the visualisation of the Jarvis March algorithm"
    },
}

export const JarvisMarch = {
    render: () => <Jarvis />,
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                pathParams: { stepid: 1 },
                state: {fromPage: "/jarvisvis"}
            },
            routing: {
                path: '/jarvisvisu/:stepid',
                handle: 'jarvisvisu'
            }
        })
    }
}