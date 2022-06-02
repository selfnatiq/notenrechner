import React from 'react'
import {
	Container,
	Heading,
	VStack,
	Flex,
	Input,
	InputRightAddon,
	InputGroup,
	Button,
	Text,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

const DEFAULT_GRADE = 6
const DEFAULT_PERCENTAGE = 100

interface Grade {
	id: number
	name: string
	grade: number
	percentage: number
}

const calculateAvg = (grades: Grade[]) => {
	const sum: any = grades.reduce(
		(acc, _grade) => {
			acc.grades += _grade.grade * _grade.percentage
			acc.percentage += _grade.percentage

			return acc
		},
		{ grades: 0, percentage: 0 }
	)

	const avg = sum.grades / sum.percentage

	if (avg > 6) return 6
	if (avg < 1) return 1
	return avg.toFixed(2)
}

interface TheDoubleInputProps {
	grade: Grade
	setGrades: React.Dispatch<React.SetStateAction<Grade[]>>
}

const TheDoubleInput: React.FC<TheDoubleInputProps> = ({ grade, setGrades }) => {
	const inputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault()

		const inputName = e.currentTarget.name
		const inputValue = parseFloat(e.currentTarget.value)

		if (isNaN(inputValue)) return

		const isGradeInput = inputName.startsWith('grade')
		console.log(inputName, inputValue, isGradeInput)

		setGrades((grades) => {
			let foundGrade = grades.find((_grade) => _grade.name === inputName)

			if (!foundGrade) return grades
			const foundGradeIndex = grades.findIndex((_grade) => _grade.name === inputName)

			foundGrade = {
				...foundGrade,
				grade: isGradeInput ? inputValue : 0,
				percentage: isGradeInput ? 100 : inputValue,
			}

			grades[foundGradeIndex] = foundGrade

			return [...grades]
		})
	}

	return (
		<Flex gap={1} w="full">
			<Input
				type="number"
				name={grade.name}
				defaultValue={grade.grade}
				min={1}
				max={6}
				onInput={inputHandler}
			/>

			<InputGroup>
				<Input
					type="number"
					name={'percentage' + grade.name}
					defaultValue={grade.percentage}
					min={1}
					max={100}
					onInput={inputHandler}
				/>
				<InputRightAddon children="%" />
			</InputGroup>
		</Flex>
	)
}

export default function Home() {
	const [grades, setGrades] = React.useState<Grade[]>([
		{ id: 1, name: 'grade1', grade: DEFAULT_GRADE, percentage: DEFAULT_PERCENTAGE },
	])

	console.log(grades)

	const addInput = (e: React.MouseEvent) => {
		e.preventDefault()

		if (grades.length >= 10) return

		setGrades((prev) => {
			const lastInput = prev[prev.length - 1]
			const newInputId = lastInput.id + 1

			return [
				...prev,
				{
					id: newInputId,
					name: 'grade' + newInputId,
					grade: DEFAULT_GRADE,
					percentage: DEFAULT_PERCENTAGE,
				},
			]
		})
	}

	const removeInput = (e: React.MouseEvent) => {
		e.preventDefault()

		if (grades.length <= 1) return

		const lastGrade = grades[grades.length - 1]
		setGrades((_grades) => _grades.filter((_grade) => _grade.name !== lastGrade.name))
	}

	return (
		<Container py={20}>
			<Heading size="xl">Notenrechner</Heading>

			<Text fontSize="xl" fontWeight="extrabold" my={2}>
				Durchschnitt: {calculateAvg(grades)}
			</Text>

			<VStack mt={6} spacing={2}>
				{grades.map((grade) => (
					<TheDoubleInput key={grade.id} grade={grade} setGrades={setGrades} />
				))}
			</VStack>

			<Flex gap={1}>
				<Button
					disabled={grades.length >= 10}
					onClick={addInput}
					w="full"
					mt={2}
					colorScheme="teal"
					variant="outline"
				>
					<AddIcon w={3} h={3} />
				</Button>
				<Button
					disabled={grades.length <= 1}
					onClick={removeInput}
					w="full"
					mt={2}
					colorScheme="red"
					variant="outline"
				>
					<DeleteIcon w={3} h={3} />
				</Button>
			</Flex>
		</Container>
	)
}
