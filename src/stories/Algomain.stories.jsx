import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import AlgoMain from "../screens/Algomain";

export default {
    title: "Pages/Algorithms/Introduction",
    component: AlgoMain,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This page contains the description of the required algorithms"
    },
    decorators: [withRouter],
}

export const JarvisMarch= {
    render: () =>  <AlgoMain key={1} id={1} heading="Jarvis March Algorithm"/>,
    parameters: {
        docs: {
            description: {
                story: "This page contains the description of the Jarvis March algorithm"
            }
        },
        reactRouter: reactRouterParameters({
            location: {
                state: {fromPage: "path"}
            },
            routing: {
                path: '/jarvis',
            }
        })
    }
}
export const KirkpatrickSeidel= {
    render: () =>  <AlgoMain key={0} id={0} heading="Kirkpatrick Seidel Algorithm"/>,
    parameters: {
        docs: {
            description: {
                story: "This page contains the description of the Kirkpatrick Seidel algorithm"
            }
        },
        reactRouter: reactRouterParameters({
            location: {
                state: {fromPage: "path"}
            },
            routing: {
                path: '/kirkpatrick',
            }
        })
    }
}