import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import Visualisation from "../screens/Visualisation";

export default {
    title: "Pages/Algorithms/Visualisation/Start",
    component: Visualisation,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This page contains the start of the visualisation of the required algorithms"
    },
    decorators: [withRouter]
}

export const JarvisMarch = {
    render: () => <Visualisation id={0} key={0} />,
    parameters: {
        docs: {
            description: {
                story: "This page contains the start of the visualisation of the Jarvis March algorithm"
            }
        },
        reactRouter: reactRouterParameters({
            location: {
                pathParams: { stepid: 0 },
                state: {fromPage: "/jarvis"}
            },
            routing: {
                path: '/jarvisvisu/:stepid',
                handle: 'jarvisvisu'
            }
        })
    }
}


export const KirkpatrickSeidel = {
    render: () => <Visualisation id={1} key={1} />,
    parameters: {
        docs: {
            description: {
                story: "This page contains the start of the visualisation of the Kirkpatrick Seidel algorithm"
            }
        },
        reactRouter: reactRouterParameters({
            location: {
                pathParams: { stepid: 0 },
                state: {fromPage: "/kirkpatrick"}
            },
            routing: {
                path: '/kirkpatrickvisu/:stepid',
                handle: 'kirkpatrickvisu'
            }
        })
    }
}