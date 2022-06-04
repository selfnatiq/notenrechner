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
	Switch,
	useColorMode,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

const DEFAULT_GRADE = 6
const DEFAULT_PERCENTAGE = 100

interface Grade {
	id: number
	name: string
	grade: number
	percentage: number
}

const calcGrade = (grades: Grade[]) => {
	const sum: { grades: number; percentage: number } = grades.reduce(
		(acc, _grade) => {
			acc.grades += _grade.grade * _grade.percentage
			acc.percentage += _grade.percentage

			return acc
		},
		{ grades: 0, percentage: 0 }
	)

	const avg = sum.grades / sum.percentage

	let color = 'green.400'
	if (avg < 5) color = 'orange.400'
	if (avg < 4) color = 'red.400'

	return { avg: avg.toFixed(2), color }
}

interface TheDoubleInputProps {
	grade: Grade
	setGrades: React.Dispatch<React.SetStateAction<Grade[]>>
	removeInput: (grade: Grade) => void
}

const TheDoubleInput: React.FC<TheDoubleInputProps> = ({ grade, setGrades, removeInput }) => {
	const gradeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		let value = parseFloat(e.currentTarget.value)

		if (isNaN(value)) return
		if (value > 6) value = 6
		if (value < 1) value = 1

		setGrades((grades) => {
			const gradeIndex = grades.findIndex((_grade) => _grade.name === grade.name)

			grades[gradeIndex] = {
				...grades[gradeIndex],
				grade: value,
			}

			return [...grades]
		})
	}

	const percentageHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		let value = parseFloat(e.currentTarget.value)

		if (isNaN(value)) return
		if (value > 100) value = 100
		if (value < 1) value = 1

		setGrades((grades) => {
			const gradeIndex = grades.findIndex((_grade) => _grade.name === grade.name)

			grades[gradeIndex] = {
				...grades[gradeIndex],
				percentage: value,
			}

			return [...grades]
		})
	}

	return (
		<Flex gap={1} w="full" style={{ WebkitTapHighlightColor: 'transparent' }}>
			<Input
				type="number"
				name={grade.name}
				defaultValue={grade.grade}
				min={1}
				max={6}
				size="lg"
				onInput={gradeHandler}
			/>

			<InputGroup size="lg">
				<Input
					type="number"
					name={'percentage' + grade.name}
					defaultValue={grade.percentage}
					min={1}
					max={100}
					onInput={percentageHandler}
				/>
				<InputRightAddon>%</InputRightAddon>
			</InputGroup>

			<Button size="lg" onClick={() => removeInput(grade)} colorScheme="red" variant="outline">
				<DeleteIcon w={3} h={3} />
			</Button>
		</Flex>
	)
}

export default function Home() {
	const [grades, setGrades] = React.useState<Grade[]>([
		{ id: 1, name: 'grade1', grade: DEFAULT_GRADE, percentage: DEFAULT_PERCENTAGE },
	])

	const { colorMode, toggleColorMode } = useColorMode()

	const addInput = (e: React.MouseEvent) => {
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

	const removeInput = (grade: Grade) => {
		if (grades.length <= 1) return
		setGrades((grades) => grades.filter((_grade) => _grade.name !== grade.name))
	}

	return (
		<Container py={4}>
			<Flex w="full" justifyContent="end">
				<Flex alignItems="center" gap={3}>
					<SunIcon w={5} h={5} />
					<Switch size="lg" isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
					<MoonIcon w={5} h={5} />
				</Flex>
			</Flex>

			<Heading size="2xl">Notenrechner</Heading>
			<VStack mt={8} spacing={2}>
				{grades.map((grade) => (
					<TheDoubleInput
						key={grade.id}
						grade={grade}
						setGrades={setGrades}
						removeInput={removeInput}
					/>
				))}
			</VStack>
			<Flex gap={1} mt={2}>
				<Button
					disabled={grades.length >= 10}
					onClick={addInput}
					w="full"
					colorScheme="teal"
					size="lg"
				>
					<AddIcon w={3} h={3} />
				</Button>
			</Flex>

			<Text fontWeight="extrabold" my={2}>
				Durchschnitt:{' '}
				<Text fontSize="5xl" as="span" color={calcGrade(grades).color}>
					{calcGrade(grades).avg}
				</Text>
			</Text>
		</Container>
	)
}
