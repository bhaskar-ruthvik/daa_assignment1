import Typewriter from "../components/Typewriter";
import TypewriterSmall from "../components/TypewriterSmall";

export default {
    title: "Components/Typewriter",
    tags: ['autodocs'],
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: "This component emulates the effect of a typewriter by producing text letter by letter. It also includes sound effects."
    },
}

const Template = args => {
        return <div className="heading">
            <Typewriter {...args} />
        </div>
       
       }
export const Heading = Template.bind({})

Heading.args = {
    text: "Hello World",
}
Heading.parameters = {

        docs: {
            description: {
                story: "This is a Heading Level Typewriter Component"
            }
        }
}

const ParaTemplate = args =>{
    return <div className="parastory">
    <TypewriterSmall {...args} />
    </div>
} 

export const Paragraph = ParaTemplate.bind({})

Paragraph.args = {
    text: "Hello World"
}

Paragraph.parameters = {
    docs: {
        description: {
            story: "This is a Paragraph Level Typewriter Component"
        }
    }
}