import { Show, createSignal, For } from 'solid-js'
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

  const [predefinedPrompts] = createSignal([
    'Prompt 1',
    'Prompt 2',
    'Prompt 3',
    // Add more predefined prompts here
  ])

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }

  const handlePromptClick = (prompt: string) => {
    systemInputRef.value = prompt
  }

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class="fi gap-1 op-50 dark:op-60">
              <IconEnv />
              <span>System Role:</span>
            </div>
            <div class="mt-1">
              { props.currentSystemRoleSettings() }
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
            <IconEnv />
            <span>Add System Role</span>
          </span>
        </Show>
      </Show>
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
          {/* Add this section to display the predefined prompts list */}
          <div class="predefined-prompts">
            <For each={predefinedPrompts()}>
              {(prompt) => (
                <div
                  onClick={() => handlePromptClick(prompt)}
                  class="predefined-prompt-item"
                >
                  {prompt}
                </div>
              )}
            </For>
          </div>
          <button onClick={handleButtonClick} gen-slate-btn>
            Set
          </button>
        </div>
      </Show>
    </div>
  )
}
