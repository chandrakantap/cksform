import React from 'react';
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import useCKSForm from '../src/index';
import Errors from '../docs/src/components/Errors';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep', noKey: true, ignoreDefaultProps: true }));

const TextFieldForm = ({ initialValue = '', onSubmit, ...props }) => {
    const { formData, onChangeField, errors, handleSubmit, validateField } = useCKSForm({ title: initialValue });
    return (
      <form noValidate autoComplete="off">
        <input
          type="text"
          name="title"
          required
          minLength={6}
          value={formData.title}
          onChange={onChangeField}
          onBlur={validateField}
          data-display-name="Title"
          {...props}
        />
        <Errors errors={errors} fieldName="title" />
        <input id="submitBtn" type="button" value="Submit" onClick={handleSubmit(onSubmit)} />
      </form>
    );
}
describe('Input field of type text', () => {
    test('renders properly', () => {
        const warapper = mount(<TextFieldForm />);
        expect(warapper).toMatchSnapshot();
    });

    test('Validates when no value provided', () => {
        const warapper = mount(<TextFieldForm />);
        warapper.find("input[type='button']").first().simulate('click');
        expect(warapper).toMatchSnapshot();
    });
})
