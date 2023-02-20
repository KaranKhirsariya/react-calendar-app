import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAppSelector } from "app/hooks";
import dayjs from "dayjs";
import {
  selectDate,
  selectMonth,
  selectYear,
} from "features/calendar/calendarSlice";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { BsCircleFill, BsXCircleFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import {
  TodoListResponse,
  useTodosCreateMutation,
  useTodosRemoveMutation,
  useTodosUpdateMutation,
} from "store/todoApi";
import { AutoResizeTextarea } from "./AutoResizeTextArea";
type Props = {
  onClose: () => void;
  isOpen: boolean;
  currentTodos: TodoListResponse | undefined;
};
const MotionFlex = motion(Flex);
function TasksPopover({ onClose, currentTodos, isOpen }: Props) {
  const year = useAppSelector(selectYear);
  const date = useAppSelector(selectDate);
  const month = useAppSelector(selectMonth);

  const [newTodoText, setNewTodoText] = useState("");
  const newTodoInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [updateTodo, { isLoading: isUpdatingTodo }] = useTodosUpdateMutation();
  const [createTodo, { isLoading: isCreatingTodo }] = useTodosCreateMutation();
  const [removeTodo] = useTodosRemoveMutation();

  const handleDelete = (uid: string) => removeTodo({ uid });

  const handleCreateTodo = () => {
    if (month != null && date != null && newTodoText) {
      createTodo({
        createTodoDto: {
          title: newTodoText,
          dueDate: dayjs(new Date(year, month, date)).toISOString(),
          listId: currentTodos?.uid,
        },
      })
        .unwrap()
        .then(() => {
          newTodoInputRef.current?.focus();
          setNewTodoText("");
        });
    }
  };

  const handleKeyDownTodo: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const val = e.currentTarget?.value?.trim();
    if (
      e.code === "Enter" &&
      val &&
      val !==
        currentTodos?.ToDo?.find(({ uid }) => e.currentTarget.name === uid)
          ?.title
    ) {
      e.preventDefault();
      updateTodo({
        uid: e.currentTarget?.name,
        updateTodoDto: { title: val },
      }).then(() => {
        newTodoInputRef.current?.focus();
      });
    }
  };

  const handleKeyDownNewTodo: React.KeyboardEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    if (e.code === "Enter") {
      if (!e.currentTarget.value.trim()) {
        return;
      }
      handleCreateTodo();
    }
  };

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom"
      initialFocusRef={newTodoInputRef}
    >
      <PopoverAnchor>
        <Button hidden={true}></Button>
      </PopoverAnchor>
      <PopoverContent borderRadius={"1em"}>
        <PopoverHeader>
          <Text fontSize="1.4em">Tasks</Text>
          <PopoverCloseButton />
        </PopoverHeader>
        <PopoverBody>
          <VStack w={300} spacing={1} my="2">
            <AnimatePresence>
              {currentTodos?.ToDo.map(({ title, uid }) => (
                <MotionFlex
                  key={uid}
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                  w="full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Box as={BsCircleFill} mr={2} />
                  <AutoResizeTextarea
                    isReadOnly={isUpdatingTodo}
                    variant="unstyled"
                    textAlign={"start"}
                    name={uid}
                    w="full"
                    defaultValue={title}
                    onKeyDown={handleKeyDownTodo}
                    // onFo={handleBlur}
                  />
                  <Box
                    as={BsXCircleFill}
                    color="red"
                    fontSize="20px"
                    m={2}
                    cursor="pointer"
                    onClick={() => handleDelete(uid)}
                  />
                </MotionFlex>
              ))}
            </AnimatePresence>

            <AutoResizeTextarea
              isReadOnly={isCreatingTodo}
              variant="outline"
              placeholder="Add new Task"
              name="newTodo"
              ref={newTodoInputRef}
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={handleKeyDownNewTodo}
            />
          </VStack>
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="md">
            <Button colorScheme="green" onClick={handleCreateTodo}>
              <Icon as={FaPlus} />
              &nbsp;&nbsp;Add
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default TasksPopover;
