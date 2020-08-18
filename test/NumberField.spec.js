import React from 'react';
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import { useCKSForm } from '../src/index';
import Errors from '../docs/src/components/Errors';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep', noKey: true, ignoreDefaultProps: true }));

const NumberFieldForm = ({ onSubmit, ...props }) => {
    const { formData, onChangeField, errors, handleSubmit, validateField } = useCKSForm({ age: '' });
    return (
      <form noValidate autoComplete="off">
        <input
          type="number"
          name="age"
          required
          min={18}
          max={65}
          value={formData.age}
          onChange={onChangeField}
          onBlur={validateField}
          data-display-name="Age"
          {...props}
        />
        <Errors errors={errors} fieldName="age" />
        <input id="submitBtn" type="button" value="Submit" onClick={handleSubmit(onSubmit)} />
      </form>
    );
}
describe('Number field', () => {
    test('renders properly', () => {
        const warapper = mount(<NumberFieldForm />);
        expect(warapper).toMatchSnapshot();
    });

    test('Validates when no value provided', () => {
        const warapper = mount(<NumberFieldForm />);
        warapper.find("input[type='button']").first().simulate('click');
        expect(warapper).toMatchSnapshot();
    });

    test('Validates when value is smaller than minimum', () => {
        const warapper = mount(<NumberFieldForm />);
        warapper.find("input[type='number']").first().simulate('change', { target: { name: 'age', value: 12 } });
        warapper.find("input[type='button']").first().simulate('click');
        expect(warapper).toMatchSnapshot();
    });

    test('Validates when value is greater than maximum', () => {
        const warapper = mount(<NumberFieldForm />);
        warapper.find("input[type='number']").first().simulate('change', { target: { name: 'age', value: 70 } });
        warapper.find("input[type='button']").first().simulate('click');
        expect(warapper).toMatchSnapshot();
    });

    test('Validates on blur', () => {
        const warapper = mount(<NumberFieldForm />);
        warapper.find("input[type='number']").first().simulate('blur');
        expect(warapper).toMatchSnapshot();
    });

    test('Validates on blur with valid data', () => {
        const warapper = mount(<NumberFieldForm />);
        warapper.find("input[type='number']").first().simulate('change', { target: { name: 'age', value: 45 } });
        warapper.find("input[type='number']").first().simulate('blur');
        expect(warapper).toMatchSnapshot();
    });

    test('Call onSubmit if validation successful', () => {
        const onSubmit = jest.fn();
        const warapper = mount(<NumberFieldForm onSubmit={onSubmit} />);
        warapper.find("input[type='number']").first().simulate('change', { target: { name: 'age', value: 34 } });
        warapper.find("input[type='button']").first().simulate('click');
        expect(onSubmit).toHaveBeenCalled();
        expect(warapper).toMatchSnapshot();
    });
})
