import React from 'react';
import {render, screen} from '@testing-library/react';
import UserList from ".";
import userEvent from "@testing-library/user-event";

test('should render users', () => {
    render(
        <UserList
            users={[{ id: 1, rating: 5, first_name: 'name', last_name: 'lastname', email: 'email', username: 'username'}]}
            replace={() => null}
        />
    );
    const mainList = document.getElementById('main-list');
    expect(mainList?.children.length).toBe(1);
});

test('should replace user to rating list', async () => {
    let users = [{ id: 1, rating: 5, first_name: 'name', last_name: 'lastname', email: 'email', username: 'username'}];
    render(
        <UserList
            users={users}
            replace={() => users = []}
        />
    );
    expect(users.length).toBe(1);

    await userEvent.click(screen.getByText('+'))
    expect(users.length).toBe(0);
})

test('should show warning modal', async () => {
    let users = [{ id: 1, rating: 5, first_name: 'name', last_name: 'lastname', email: 'email', username: 'username'}]
    render(
        <UserList
            users={users}
            replace={() => users = []}
            save={(u) => users = [u]}
            isRating={true}
        />
    );

    await userEvent.click(screen.getByText('+'));
    expect(screen.getByText('Нужно вознаградить username. Сделать это?')).toBeInTheDocument();
});
