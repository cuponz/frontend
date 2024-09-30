## Logic of Zustand Store and React Query

Set enabled of react query to false if the state is updated in zustand store. 

It will cause slight problem about not update the state while the user is using the website. But F5 should still work since it is only the state.

To fix the problem, we manually reset the store everytime we update (send POST request) the data.