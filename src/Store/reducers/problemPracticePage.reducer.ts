import { createSlice } from 'src/deps'
import { appDispatcher } from 'src/Store'
import * as monaco from 'monaco-editor'

export interface ProblemPracticePageStateType {
	code: string
	cursorPosition: monaco.Position | -1
}

// const tempDefaultValue = `db.orders.aggregate( [
// 	// Stage 1: Filter pizza order documents by date range
// 	{
// 	   $match:
// 	   {
// 		  "date": { $gte: new ISODate( "2020-01-30" ), $lt: new ISODate( "2022-01-30" ) }
// 	   }
// 	},
// 	// Stage 2: Group remaining documents by date and calculate results
// 	{
// 	   $group:
// 	   {
// 		  _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
// 		  totalOrderValue: { $sum: { $multiply: [ "$price", "$quantity" ] } },
// 		  averageOrderQuantity: { $avg: "$quantity" }
// 	   }
// 	},
// 	// Stage 3: Sort documents by totalOrderValue in descending order
// 	{
// 	   $sort: { totalOrderValue: -1 }
// 	}
//   ] )
//  `

const tempDefaultValue = `db.orders.aggregate( [
	// Stage 1: Filter pizza order documents by date range
 `

export const initialState: ProblemPracticePageStateType = {
	code: tempDefaultValue,
	cursorPosition: -1,
}

const problemPracticePageSlice = createSlice({
	name: 'problemPracticePage',
	initialState,
	reducers: {
		updateCode: (state, { payload }) => {
			const { code, cursorPosition } = payload
			state.code = code
			state.cursorPosition = cursorPosition
		},
	},
})

const { updateCode } = problemPracticePageSlice.actions

export const updateCodeDispatcher = (
	code: string,
	cursorPosition: monaco.Position | -1
) => {
	appDispatcher(updateCode({ code, cursorPosition }))
}

export default problemPracticePageSlice.reducer
