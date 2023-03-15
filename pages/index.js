import Section from "@/components/Section";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
    return (
        <SmoothScroll>
            <h2>Smooth Scrolling</h2>
            <Section flexDirection="row" />
            <Section flexDirection="row-reverse" />
            <Section flexDirection="row" />
            <Section flexDirection="row-reverse" />
            <Section flexDirection="row" />
            <Section flexDirection="row-reverse" />
        </SmoothScroll>
    );
}
