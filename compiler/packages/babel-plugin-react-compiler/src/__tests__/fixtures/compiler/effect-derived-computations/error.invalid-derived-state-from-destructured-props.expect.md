
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

This state is computed from props (props) and kept in sync with an effect. Props are already reactive, so compute this value directly during render instead of mirroring it into state — this removes the redundant useState plus useEffect pair and avoids the extra render that can briefly show stale values to users. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state.

error.invalid-derived-state-from-destructured-props.ts:10:4
   8 |
   9 |   useEffect(() => {
> 10 |     setFullName(props.firstName + ' ' + props.lastName);
     |     ^^^^^^^^^^^ This is computed from props (props) — derive it during render instead of in an effect
  11 |   }, [props.firstName, props.lastName]);
  12 |
  13 |   return <div>{fullName}</div>;
```
          
      