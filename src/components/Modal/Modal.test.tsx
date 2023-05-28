import React from 'react';
import {render, screen} from '@testing-library/react';
import UserList from ".";
import userEvent from "@testing-library/user-event";
import Modal from ".";

test('should show modal content', () => {
    const show = true;
    render(
        <Modal show={show}><h1>Test</h1></Modal>
    );
    expect(screen.getByRole('heading')).toHaveTextContent('Test')
});
