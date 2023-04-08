import { Show, createSignal } from 'solid-js'
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
  let systemInputRef: HTMLTextAreaElement
  let systemBehaviorRef: HTMLSelectElement

  const [selectedSystemBehavior, setSelectedSystemBehavior] = createSignal('')

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }

  const handleSystemBehaviorChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    setSelectedSystemBehavior(target.value)
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
            <textarea
              ref={systemInputRef!}
              placeholder="...."
              autocomplete="off"
              autofocus
              rows="3"
              gen-textarea
            />
          </div>
          <div>
            <select
              ref={systemBehaviorRef!}
              value={selectedSystemBehavior()}
              onChange={handleSystemBehaviorChange}
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
