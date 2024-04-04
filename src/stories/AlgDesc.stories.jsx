import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import AlgDesc from "../screens/AlgDesc";

export default {
    title: "Pages/Algorithms/Description",
    component: AlgDesc,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This page contains the step by step explanation of the required algorithms"
    },
    decorators: [withRouter],
}

export const JarvisMarch ={
    render: () => <AlgDesc id={1} />,
    parameters: {
        docs: {
            description: {
                story: "This page contains the step by step explanation of the Jarvis March algorithm"
            }
        },
        reactRouter: reactRouterParameters({
            routing: {
                path: '/jarvisdesc',
                handle: 'jarvisdesc'
            }
        })
    }
}
export const KirkpatrickSeidel ={
    render: () => <AlgDesc id={0} />,
    parameters: {
        docs: {
            description: {
                story: "This page contains the step by step explanation of the Kirkpatrick Seidel algorithm"
            }
        },
        reactRouter: reactRouterParameters({
            routing: {
                path: '/kpsdesc',
                handle: 'kpsdesc'
            }
        })
    }
}