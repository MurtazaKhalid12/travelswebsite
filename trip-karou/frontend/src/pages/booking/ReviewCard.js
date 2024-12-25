import {Star,User} from "lucide-react"

const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h4 className="font-semibold">{review.user.name}</h4>
            <p className="text-sm text-gray-500">
              {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-gray-600">{review.review}</p>
    </div>
  );
  export default ReviewCard;