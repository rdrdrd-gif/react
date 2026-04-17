
## Input

```javascript
// @validateNoDerivedComputationsInEffects_exp
import {useEffect, useState} from 'react';

export default function Component({props}) {
  const [fullName, setFullName] = useState(
    props.firstName + ' ' + props.lastName
  );

  useEffect(() => {
    setFullName(props.firstName + ' ' + props.lastName);
  }, [props.firstName, props.lastName]);

  return <div>{fullName}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{props: {firstName: 'John', lastName: 'Doe'}}],
};

```


## Error

```
Found 1 error:

Error: You might not need an effect. Derive values in render, not effects.

This value is derived from the prop `props`, so it should be computed during render instead of inside an effect. Running a derived computation in an effect schedules an unnecessary extra render and can briefly show stale values to the user. Replace the `useState` + `useEffect` pair with a plain `const` (or `useMemo` if the computation is expensive) that is recomputed from the same source(s) during render. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state for more details.

error.invalid-derived-state-from-destructured-props.ts:10:4
   8 |
   9 |   useEffect(() => {
> 10 |     setFullName(props.firstName + ' ' + props.lastName);
     |     ^^^^^^^^^^^ Derive this value during render instead of updating state from an effect
  11 |   }, [props.firstName, props.lastName]);
  12 |
  13 |   return <div>{fullName}</div>;
```
          
      