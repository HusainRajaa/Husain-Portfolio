import tkinter as tk

def calculate():
    try:
        result.set(eval(entry.get()))
    except:
        result.set("Error")

# Create the main window
root = tk.Tk()
root.title("Simple Calculator")

# Entry widget to input expression
entry = tk.Entry(root, width=20, font=('Arial', 14))
entry.grid(row=0, column=0, columnspan=4, padx=10, pady=10)

# Result display
result = tk.StringVar()
result.set("")
result_label = tk.Label(root, textvariable=result, font=('Arial', 14), anchor="e")
result_label.grid(row=1, column=0, columnspan=4, padx=10, pady=10, sticky="ew")

# Buttons for digits and operations
buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
]

row = 2
col = 0
for button in buttons:
    tk.Button(root, text=button, width=5, font=('Arial', 14), command=lambda b=button: entry.insert(tk.END, b)).grid(row=row, column=col, padx=5, pady=5)
    col += 1
    if col > 3:
        col = 0
        row += 1

# Button to clear the entry
tk.Button(root, text="Clear", width=5, font=('Arial', 14), command=lambda: entry.delete(0, tk.END)).grid(row=row, column=0, columnspan=2, padx=5, pady=5)
# Button to calculate the result
tk.Button(root, text="=", width=5, font=('Arial', 14), command=calculate).grid(row=row, column=2, columnspan=2, padx=5, pady=5)

root.mainloop()
