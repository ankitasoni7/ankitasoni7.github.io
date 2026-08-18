# project1 — diagrams

Drop your diagram SVGs here (they load at runtime, so just add the file):

```
information-architecture/project1_ia.svg        → "Information Architecture" tab
userflow/project1_userflow1.svg                 → "User Flow" tab
```

- Files are referenced by the Diagram section's `diagramTabs` in the project page.
- To add more flows, drop e.g. `userflow/project1_userflow2.svg` and add a tab entry
  `{ label: 'User Flow 2', src: '/projects/project1/diagram/userflow/project1_userflow2.svg' }`.
- Until a file exists the tab shows a "drop an .svg here" placeholder.
