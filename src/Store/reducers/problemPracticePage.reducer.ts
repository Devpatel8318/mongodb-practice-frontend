import { createSlice } from 'src/deps'
import { appDispatcher } from 'src/Store'
import * as monaco from 'monaco-editor'
import { API_STATUS_TYPE } from 'src/utils/callApi'
import { ReducerErrorObject } from 'src/Types/global'

export interface ProblemPracticePageStateType {
	code: string
	cursorPosition: monaco.Position | -1
	status: API_STATUS_TYPE
	error: null | ReducerErrorObject
	loading: boolean
	success: null | boolean
}

const tempDefaultValue = `db.orders.aggregate([
  // Stage 1: Match recent completed orders from specific users
  {
    $match: {
      status: "completed", // Order status
      createdAt: { $gte: ISODate("2023-01-01"), $lte: ISODate("2023-12-31") }, // Date range
      userId: { $in: [ObjectId("60c72b2f5f1b2c001c8e4b1a"), ObjectId("60c72b2f5f1b2c001c8e4b1b")] }, // User filter
      notes: { $regex: /discount|offer/i } // Regex match on notes
    }
  },

  // Stage 2: Add computed fields
  {
    $addFields: {
      yearMonth: {
        $dateToString: { format: "%Y-%m", date: "$createdAt" }
      },
      totalPrice: { $sum: "$items.price" },
      isVIP: { $eq: ["$customerType", "VIP"] },
      refId: { $toObjectId: "$referralCode" }
    }
  },

  // Stage 3: Lookup customer data
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            fullName: { $concat: ["$firstName", " ", "$lastName"] },
            email: 1,
            registeredAt: 1
          }
        }
      ]
    }
  },

  // Stage 4: Unwind array
  { $unwind: "$userDetails" },

  // Stage 5: Group by user and month
  {
    $group: {
      _id: {
        user: "$userId",
        month: "$yearMonth"
      },
      totalOrders: { $sum: 1 },
      avgOrderValue: { $avg: "$totalPrice" },
      allOrderIds: { $push: "$_id" },
      latestNote: { $push: "$notes" }
    }
  },

  // Stage 6: Sort by total orders descending
  {
    $sort: { totalOrders: -1 }
  },

  // Stage 7: Add final fields
  {
    $addFields: {
      userMonth: { $concat: ["$_id.user", "_", "$_id.month"] }
    }
  },

  // Stage 8: Count total unique user-month combos
  {
    $count: "monthlyUserSegments"
  },

  // Stage 9: Optional merge
  // This would persist output into a collection
  {
    $merge: {
      into: "aggregatedOrders",
      whenMatched: "merge",
      whenNotMatched: "insert"
    }
  }
])
 `

export const initialState: ProblemPracticePageStateType = {
	code: tempDefaultValue,
	cursorPosition: -1,
	status: null,
	error: null,
	loading: false,
	success: null,
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
