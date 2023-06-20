package utils

import (
	"fmt"
	"strconv"
	"strings"
)

func IntsToString(ints []int) string {
	stringArray := make([]string, len(ints))
	for i, v := range ints {
		stringArray[i] = fmt.Sprint(v)
	}
	return strings.Join(stringArray, ",")
}

func StringToInts(str string) []int {
	str = strings.Trim(str, "[]")
	strs := strings.Split(str, ",")
	ints := make([]int, len(strs))
	for i, s := range strs {
		j, err := strconv.Atoi(s)
		if err != nil {
			panic(err)
		}
		ints[i] = j
	}
	return ints
}
