// exam: ["v_0:1", "v_0:2"] => ["0:1", "0:2"]

export function removeV_s(v_s: string[] | undefined) {
  if(v_s === undefined) return
  return v_s.map(v => removeV_(v))
}

// exam: v_0:1
export function removeV_(v_: string) {
  return v_.split("_")[1]
}