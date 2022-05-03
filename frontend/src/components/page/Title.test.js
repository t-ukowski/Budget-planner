import Title from './Title';
import { mount } from 'enzyme'

describe("", () => {
    it("renders correctly with no error message", () => {
        const wrapper = mount(<Title>Hello there</Title>);
        expect(wrapper.containsMatchingElement(<Title>Hello there</Title>)).toEqual(true);
    });
    it("contains title", () => {
        const wrapper = mount(<Title>Hello there</Title>);
        expect(wrapper.props().children).toEqual('Hello there');
    });
});
