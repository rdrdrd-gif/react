
## Input

```javascript
// @validateNoDerivedComputationsInEffects_exp
import {useEffect, useState} from 'react';

function Component({firstName}) {
  const [lastName, setLastName] = useState('Doe');
  const [fullName, setFullName] = useState('John');

  const middleName = 'D.';

  useEffect(() => {
    setFullName(firstName + ' ' + middleName + ' ' + lastName);
  }, [firstName, middleName, lastName]);

  return (
    <div>
      <input value={lastName} onChange={e => setLastName(e.target.value)} />
      <div>{fullName}</div>
    </div>
  );
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{firstName: 'John'}],
};

```


## Error

```
Found 1 error:

Error: You might not need an effect. Derive values in render, not effects.

This value is derived from the props and local state (`firstName`, `lastName`), so it should be computed during render instead of inside an effect. Running a derived computation in an effect schedules an unnecessary extra render and can briefly show stale values to the user. Replace the `useState` + `useEffect` pair with a plain `const` (or `useMemo` if the computation is expensive) that is recomputed from the same source(s) during render. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state for more details.

error.derived-state-from-prop-local-state-and-component-scope.ts:11:4
   9 |
  10 |   useEffect(() => {
> 11 |     setFullName(firstName + ' ' + middleName + ' ' + lastName);
     |     ^^^^^^^^^^^ Derive this value during render instead of updating state from an effect
  12 |   }, [firstName, middleName, lastName]);
  13 |
  14 |   return (
```
          
      