import { Show } from 'solid-js'
import type { Accessor, Setter } from 'solid-js'
import IconEnv from './icons/Env'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}

export default (props: Props) => {
  let systemSelectRef: HTMLSelectElement

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemSelectRef.value)
    props.setSystemRoleEditing(false)
  }

  const handleSelectChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    systemSelectRef.value = target.value;
  }

  return (
    <div class="my-4">
      {/* ... */}
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60">
            <IconEnv />
            <span>System Role:</span>
          </div>
          <p class="my-2 leading-normal text-sm op-50 dark:op-60">Set the behavior of the assistant.</p>
          <div>
            <select
              ref={systemSelectRef!}
              onChange={handleSelectChange}
              gen-select
            >
              <option value="">Select a system behavior</option>
              <option value="Behavior 1">Behavior 1</option>
              <option value="Behavior 2">Behavior 2</option>
              <option value="Behavior 3">Behavior 3</option>
              {/* Add more options for system behaviors here */}
            </select>
          </div>
          <button onClick={handleButtonClick} gen-slate-btn>
            Set
          </button>
        </div>
      </Show>
    </div>
  )
}
