def generate_html_file(num_links, worker_id, file_name, start_assignment_id=21):
    with open(file_name, 'w') as f:
        f.write('<!DOCTYPE html>\n')
        f.write('<html>\n')
        f.write('<head>\n')
        f.write('    <title>Pigmented Iris Tasks</title>\n')
        f.write('</head>\n')
        f.write('<body>\n')
        # Add a centered title for "Pigmented Iris"
        f.write('    <h1 style="text-align: center;">Pigmented Iris</h1>\n')
        f.write('    <ul>\n')

        assignment_id = start_assignment_id
        for i in range(1, num_links + 1):
            link = f'https://root-pigmented-iris-p-1-e7d0de-bd81c577530d.herokuapp.com/?worker_id={worker_id}&assignment_id={assignment_id}'
            f.write(f'        <li><a href="{link}">Task {i}</a></li>\n')
            assignment_id += 1

        f.write('    </ul>\n')
        f.write('</body>\n')
        f.write('</html>\n')


# Set the desired number of links, worker ID, and the starting assignment ID
num_links = 2183
worker_id = 'expert'  # Replace "x" with the actual worker ID you want to use
starting_assignment_id = 1

# Generate the HTML file
html_file_name = 'pigmented_iris_links.html'
generate_html_file(num_links, worker_id, html_file_name, starting_assignment_id)

print(
    f"HTML file '{html_file_name}' with {num_links} links starting from assignment_id {starting_assignment_id} has been generated.")
