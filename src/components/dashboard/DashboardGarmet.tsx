import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Grid, Container, Typography, Input } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";

import { createGarmet } from "../../redux/actions/garmetActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      margin: theme.spacing(1),
      color: theme.palette.primary.light,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    field: {
      marginBottom: theme.spacing(1),
    },
    categoryBox: {
      textAlign: "center",
    },
    categoryLabel: {
      color: "#8a8a8a",
      margin: "0.5rem 0 0.25rem",
      textAlign: "left",
    },
    select: {
      width: "100%",
      fontSize: "1rem",
      padding: "0.5rem 0.25rem",
      margin: ".2rem 0",
    },
    submit: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      margin: theme.spacing(3, 0, 2),
      "&:hover": {
        border: "0.2rem #404040 solid",
        backgroundColor: theme.palette.primary.light,
      },
    },
    link: {
      textDecoration: "none",
    },
    input: {
      margin: "0.5rem auto",
      width: "100%",
      textAlign: "center",
    },
    signUp: {
      textAlign: "center",
    },
    error: {
      color: "#fa1e0e",
      textAlign: "center",
    },
  })
);

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, "Title is too long.")
    .required("This field is required."),
  description: Yup.string().required("This field is required."),
  category: Yup.string()
    .max(50, "Category is too long.")
    .required("This field is required."),
  stock: Yup.string()
    .min(0, "Stock cannot be negative.")
    .required("This field is required."),
  price: Yup.string()
    .min(0, "Price cannot be negative.")
    .required("This field is required."),
  color: Yup.string(),
  size: Yup.string(),
  image: Yup.string().required("This field is required."),
});

type State = {
  garmet: {
    errorCreateGarmet: Error | null;
  };
};

type InitialValue = {
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  color: string;
  size: string;
  image: string;
};

const initialValue: InitialValue = {
  name: "",
  description: "",
  category: "",
  stock: 0,
  price: 0,
  color: "",
  size: "",
  image: "",
};

const DashboardGarmet = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { errorCreateGarmet } = useSelector((state: State) => state.garmet);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography className={classes.title} variant="h4" noWrap>
          Add a new garmet
        </Typography>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const form = new FormData();
            form.append("image", values.image);
            form.append("title", values.name);
            form.append("description", values.description);
            form.append("category", values.category);
            form.append("stock", values.stock.toString());
            form.append("price", values.price.toString());
            form.append("color", values.color);
            form.append("size", values.size);
            dispatch(createGarmet(form));
            resetForm();
          }}
        >
          {(formProps) => (
            <Form className={classes.form}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="stock"
                  label="Number in stock"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="price"
                  label="Price"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="color"
                  label="Color"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="size"
                  label="Size"
                  type="text"
                  fullWidth
                  className={classes.field}
                />
              </Grid>
              <Grid item xs={12} className={classes.categoryBox}>
                <p className={classes.categoryLabel}>Category</p>
                <Field
                  label="Category"
                  name="category"
                  component="select"
                  className={classes.select}
                >
                  <option value="T-shirt-Polos">T-shirts & Polos</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Shorts">Shorts</option>
                  <option value="Trousers">Trousers</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Lightweight jackets">
                    Lightweight jackets
                  </option>
                  <option value="Cardigans & knitted jumper">
                    Cardigans & knitted jumper
                  </option>
                  <option value="Sweatshirts & Hoodies">
                    Sweatshirts & Hoodies
                  </option>
                  <option value="Tracksuits & Joggers">
                    Tracksuits & Joggers
                  </option>
                  <option value="Sportswear">Sportswear</option>
                </Field>
              </Grid>
              <Grid item xs={12} className={classes.input}>
                <Input
                  className={classes.input}
                  name="image"
                  type="file"
                  onChange={(event) => {
                    formProps.setFieldValue(
                      "image",
                      (event.currentTarget as any).files[0]
                    );
                  }}
                />
              </Grid>
              {errorCreateGarmet ? (
                <div className={classes.error}>{errorCreateGarmet.message}</div>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add new garmet
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default DashboardGarmet;
