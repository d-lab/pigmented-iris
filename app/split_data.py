import csv
import math


def split_csv(input_file, output_files, num_splits):
    with open(input_file, 'r') as file:
        reader = csv.reader(file)
        header = next(reader)
        rows = list(reader)

    total_rows = len(rows)
    rows_per_split = math.ceil(total_rows / num_splits)

    for i in range(num_splits):
        start_idx = i * rows_per_split
        end_idx = min((i + 1) * rows_per_split, total_rows)

        output_file = output_files[i]
        with open(output_file, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(header)
            writer.writerows(rows[start_idx:end_idx])


if __name__ == "__main__":
    input_file = "ImagesNeedMoreAnnotation.csv"
    output_files = ["output1.csv",
                    "output2.csv",
                    "output3.csv",
                    "output4.csv"]
    num_splits = 4

    split_csv(input_file, output_files, num_splits)
