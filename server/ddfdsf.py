def parse_lesson_plan(lesson_plan_text):
    lesson_plan = []
    day_lines = lesson_plan_text.split("\n\n")

    for day_text in day_lines:
        day_lines = day_text.strip().split("\n")
        day_bullet_points = [line.strip("- ").strip() for line in day_lines[1:]]
        lesson_plan.append(day_bullet_points)

    return lesson_plan


# Example lesson plan in plaintext
lesson_plan_text = """
Day 1
- Introduction to Convergent and Divergent Infinite Series 
- Definition of Convergent and Divergent Series 
- Arithmetic and Geometric Series

Day 2
- The nth Term Test for Divergence 
- Overview of the Integral Test for Convergence 
- Using the Integral Test to Determine Convergence

Day 3
- Understanding the Harmonic Series and p-Series 
- Properties and Convergence of Harmonic and p-Series 
- Applying the Comparison Test for Convergence

Day 4
- Exploring the Alternating Series Test for Convergence 
- Conditions for Application of the Alternating Series Test 
- Examples and Practice Problems with Alternating Series

Day 5
- Evaluating Convergence using the Ratio Test 
- Applying the Ratio Test to Sequences and Series 
- Testing for Absolute and Conditional Convergence

Day 6
- Error Bounds in Alternating Series 
- Understanding Taylor Polynomial Approximations 
- Calculating Lagrange Error Bound 

Day 7
- Discussion of Radius and Interval of Convergence 
- Identifying Cases of Convergence and Divergence 
- Examples and Application of Power Series

Day 8
- Finding Taylor or Maclaurin Series for a Function 
- Identifying Coefficients in a Maclaurin Series 
- Finding the Sum of a Taylor Series 

Day 9
- Representing Functions as Power Series 
- Using Power Series to Solve Problems 
- Application Problems and Review for Test
"""

lesson_plan = parse_lesson_plan(lesson_plan_text)
print(lesson_plan)
