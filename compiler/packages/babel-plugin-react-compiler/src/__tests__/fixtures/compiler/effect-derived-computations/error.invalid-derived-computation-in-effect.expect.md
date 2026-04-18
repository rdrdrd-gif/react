
## Input

```javascript
// @validateNoDerivedComputationsInEffects_exp
import {useEffect, useState} from 'react';

function Component() {
  const [firstName, setFirstName] = useState('Taylor');
  const lastName = 'Swift';

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);

  return <div>{fullName}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [],
};

```


## Error

```
Found 1 error:

Error: You might not need an effect. Derive values in render, not effects.

This state is computed from other local state (firstName) and kept in sync with an effect. Compute the value directly during render (or wrap it in useMemo only if the computation is expensive) instead of mirroring it into another useState — this avoids the redundant state and the extra render the effect triggers, which can briefly show stale values to users. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state.

error.invalid-derived-computation-in-effect.ts:11:4
   9 |   const [fullName, setFullName] = useState('');
  10 |   useEffect(() => {
> 11 |     setFullName(firstName + ' ' + lastName);
     |     ^^^^^^^^^^^ This is computed from local state (firstName) — derive it during render instead of in an effect
  12 |   }, [firstName, lastName]);
  13 |
  14 |   return <div>{fullName}</div>;
```
          
      