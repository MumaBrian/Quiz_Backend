import { CategoryService } from "../../services";
import { Category } from "../../types";
import { Body, Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
export type CreateCategoryType = Omit<Category, "id">;
import { UtilService } from "../../services";

@Route("/api/category")
@Tags("Category Creation controller Options")
export default class CategoryController {
  @Post("/create/category")
	public async createCategory(@Body() data: CreateCategoryType): Promise<any> {
		return new CategoryService().createCategory(data);
	}

  @Get("/get/category-collection")
  public async getAllRecords(@Query() collectionName: string): Promise<any[]> {
  	try {
  		const records = await new UtilService().getCollection(collectionName);
  		return records;
  	} catch (error) {
  		throw new Error(`Error retrieving collection: ${error.message}`);
  	}
  }

  @Get("/get/category-record")
  public async getRecord(
    @Query("collectionName") collectionName: string,
    @Query("documentId") documentId: string
  ): Promise<any> {
  	try {
  		const record = await new UtilService().getRecord(
  			collectionName,
  			documentId
  		);
  		return record;
  	} catch (error) {
  		throw new Error(`Error retrieving record: ${error.message}`);
  	}
  }

  @Delete("/delete/category-record")
  public async deleteRecord(
    @Query("collectionName") collectionName: string,
    @Query("documentId") documentId: string
  ): Promise<any> {
  	try {
  		const record = await new UtilService().deleteRecord(
  			collectionName,
  			documentId
  		);
  		return record;
  	} catch (error) {
  		throw new Error(`Error deleting record: ${error.message}`);
  	}
  }

  @Put("/update/category-record")
  public async updateCategory(
    @Query("CategoryId") CategoryId: string,
    @Body() updatedData: CreateCategoryType
  ): Promise<any> {
  	return new CategoryService().updateCategory(CategoryId, updatedData);
  }
  catch(e) {
  	console.log(e);
  	throw new Error("Failed to update category");
  }
}
