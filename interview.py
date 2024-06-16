def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    for i in range(0, len(nums)-1):
        for j in range(i+1, len(nums)):
            print(nums[i], nums[j])
            if (target - nums[i] == nums[j]):
                return [i, j]
            
            
print(twoSum([3,2,4], 6))
        

        